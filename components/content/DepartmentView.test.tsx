import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { STEP_TOOL, aRunbook, aSinglePhaseRunbook } from "@/test/fixtures";

import { DepartmentView } from "./DepartmentView";

const department = aRunbook();
const singlePhase = aSinglePhaseRunbook();

const firstStep = department.steps[0];
const secondStep = department.steps[1];
const lastStep = department.steps.at(-1)!;
const total = department.steps.length;

describe("DepartmentView in List mode", () => {
  it("opens on the Department, its Tool and where the Tool lives", () => {
    render(<DepartmentView department={department} />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: department.name,
    });
    expect(heading).toBeInTheDocument();

    const heroBlock = heading.closest("section")!;
    expect(within(heroBlock).getByText(department.tool)).toBeInTheDocument();
    expect(
      within(heroBlock).getByText(department.toolNote),
    ).toBeInTheDocument();
  });

  it("lists every Step by title and keeps the detail out of the list", () => {
    render(<DepartmentView department={department} />);

    for (const step of department.steps) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    }
    expect(screen.queryByText(firstStep.detail)).not.toBeInTheDocument();
  });

  it("groups the Runbook under a heading per Phase, each an ordered list numbered from its real position", () => {
    render(<DepartmentView department={department} />);

    const before = screen.getByRole("list", { name: "Antes do culto" });
    const during = screen.getByRole("list", { name: "Durante" });
    const closing = screen.getByRole("list", { name: "Encerramento" });

    expect(before).toHaveAttribute("start", "1");
    expect(during).toHaveAttribute("start", "6");
    expect(closing).toHaveAttribute("start", "8");

    expect(within(before).getAllByRole("listitem")).toHaveLength(5);
    expect(within(during).getAllByRole("listitem")).toHaveLength(2);
    expect(within(closing).getAllByRole("listitem")).toHaveLength(2);
  });

  it("reads each Step's number as part of the Step", () => {
    render(<DepartmentView department={department} />);

    const closing = screen.getByRole("list", { name: "Encerramento" });
    const [eighth, ninth] = within(closing).getAllByRole("listitem");

    expect(eighth).toHaveTextContent(/^8/);
    expect(ninth).toHaveTextContent(/^9/);
  });

  it("marks no Phases for a Runbook that happens in one", () => {
    render(<DepartmentView department={singlePhase} />);

    expect(
      screen.queryByRole("heading", { name: "Durante a semana" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveAttribute("start", "1");
  });

  it("keeps the intro closed until asked for, and opens it on demand", async () => {
    render(<DepartmentView department={department} />);

    const toggle = screen.getByRole("button", { name: "Sobre o departamento" });
    const panel = screen.getByRole("region", {
      name: "Sobre o departamento",
      hidden: true,
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("inert");

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("inert");
    expect(screen.getByRole("region", { name: "Sobre o departamento" })).toBe(
      panel,
    );
    expect(within(panel).getByText(department.intro)).toBeInTheDocument();
  });
});

describe("DepartmentView in Focus mode", () => {
  async function enterFocusMode() {
    render(<DepartmentView department={department} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Seguir passo a passo no culto" }),
    );
  }

  it("shows one Step with its detail, starting at the first", async () => {
    await enterFocusMode();

    expect(screen.getByText(`Passo 1 de ${total}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: firstStep.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(firstStep.detail)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1",
    );
  });

  it("previews the next Step and cannot go back from the first", async () => {
    await enterFocusMode();

    expect(
      screen.getByText(`Depois: ${secondStep.title}`),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
  });

  it("moves forward and back one Step at a time", async () => {
    await enterFocusMode();

    await userEvent.click(screen.getByRole("button", { name: "Próximo" }));
    expect(screen.getByText(`Passo 2 de ${total}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: secondStep.title }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getByText(`Passo 1 de ${total}`)).toBeInTheDocument();
  });

  it("ends the Runbook plainly on the last Step", async () => {
    await enterFocusMode();

    for (let i = 1; i < total; i++) {
      await userEvent.click(screen.getByRole("button", { name: "Próximo" }));
    }

    expect(screen.getByText(`Passo ${total} de ${total}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: lastStep.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Este é o último passo.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Fim do passo a passo" }),
    ).toBeDisabled();
  });

  it("shows a Step's own Tool when it names one", async () => {
    await enterFocusMode();

    expect(screen.queryByText(STEP_TOOL)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Próximo" }));

    expect(screen.getByText(STEP_TOOL)).toBeInTheDocument();
  });

  it("returns to the list, and starts again from the first Step next time", async () => {
    await enterFocusMode();
    await userEvent.click(screen.getByRole("button", { name: "Próximo" }));

    await userEvent.click(screen.getByRole("button", { name: "Ver lista" }));
    expect(
      screen.getByRole("list", { name: "Antes do culto" }),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Seguir passo a passo no culto" }),
    );
    expect(screen.getByText(`Passo 1 de ${total}`)).toBeInTheDocument();
  });
});
