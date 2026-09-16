import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { getDepartment } from "@/lib/content";

import { DepartmentView } from "./DepartmentView";

const transmissao = (await getDepartment("transmissao"))!;
const banner = (await getDepartment("banner"))!;

const firstStep = transmissao.steps[0];
const lastStep = transmissao.steps.at(-1)!;

describe("DepartmentView in List mode", () => {
  it("opens on the Department, its Tool and where the Tool lives", () => {
    render(<DepartmentView department={transmissao} />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Transmissão",
    });
    expect(heading).toBeInTheDocument();
    const heroBlock = heading.closest("section")!;
    expect(within(heroBlock).getByText("OBS Studio")).toBeInTheDocument();
    expect(within(heroBlock).getByText(transmissao.toolNote)).toBeInTheDocument();
  });

  it("says when the Runbook was last updated", () => {
    render(<DepartmentView department={transmissao} />);

    expect(
      screen.getByText("Atualizado em 15 de setembro de 2026"),
    ).toBeInTheDocument();
  });

  it("lists every Step by title and keeps the detail out of the list", () => {
    render(<DepartmentView department={transmissao} />);

    for (const step of transmissao.steps) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    }
    expect(screen.queryByText(firstStep.detail)).not.toBeInTheDocument();
  });

  it("groups the Runbook under a heading per Phase, each an ordered list numbered from its real position", () => {
    render(<DepartmentView department={transmissao} />);

    const before = screen.getByRole("list", { name: "Antes do culto" });
    const during = screen.getByRole("list", { name: "Durante" });
    const closing = screen.getByRole("list", { name: "Encerramento" });

    expect(before).toHaveAttribute("start", "1");
    expect(during).toHaveAttribute("start", "6");
    expect(closing).toHaveAttribute("start", "8");

    expect(within(before).getAllByRole("listitem")).toHaveLength(5);
    expect(within(closing).getAllByRole("listitem")).toHaveLength(2);
  });

  it("reads each Step's number as part of the Step", () => {
    render(<DepartmentView department={transmissao} />);

    const closing = screen.getByRole("list", { name: "Encerramento" });
    const [eighth, ninth] = within(closing).getAllByRole("listitem");

    expect(eighth).toHaveTextContent(/^8/);
    expect(ninth).toHaveTextContent(/^9/);
  });

  it("marks no Phases for a Runbook that happens in one", () => {
    render(<DepartmentView department={banner} />);

    expect(
      screen.queryByRole("heading", { name: "Durante a semana" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveAttribute("start", "1");
  });

  it("keeps the intro closed until asked for, and opens it on demand", async () => {
    render(<DepartmentView department={transmissao} />);

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
    expect(
      screen.getByRole("region", { name: "Sobre o departamento" }),
    ).toBe(panel);
    expect(within(panel).getByText(transmissao.intro)).toBeInTheDocument();
  });
});

describe("DepartmentView in Focus mode", () => {
  async function enterFocusMode() {
    render(<DepartmentView department={transmissao} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Seguir passo a passo no culto" }),
    );
  }

  it("shows one Step with its detail, starting at the first", async () => {
    await enterFocusMode();

    expect(screen.getByText("Passo 1 de 9")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: firstStep.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(firstStep.detail)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
  });

  it("previews the next Step and cannot go back from the first", async () => {
    await enterFocusMode();

    expect(
      screen.getByText(`Depois: ${transmissao.steps[1].title}`),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
  });

  it("moves forward and back one Step at a time", async () => {
    await enterFocusMode();

    await userEvent.click(screen.getByRole("button", { name: "Próximo" }));
    expect(screen.getByText("Passo 2 de 9")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: transmissao.steps[1].title }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getByText("Passo 1 de 9")).toBeInTheDocument();
  });

  it("ends the Runbook plainly on the last Step", async () => {
    await enterFocusMode();

    for (let i = 1; i < transmissao.steps.length; i++) {
      await userEvent.click(screen.getByRole("button", { name: "Próximo" }));
    }

    expect(screen.getByText("Passo 9 de 9")).toBeInTheDocument();
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

    await userEvent.click(screen.getByRole("button", { name: "Próximo" }));

    expect(screen.getByText("OBS Studio")).toBeInTheDocument();
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
    expect(screen.getByText("Passo 1 de 9")).toBeInTheDocument();
  });
});
