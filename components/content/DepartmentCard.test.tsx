import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type Department, getDepartment } from "@/lib/content";

import { DepartmentCard } from "./DepartmentCard";

const transmissao = (await getDepartment("transmissao"))!;

describe("DepartmentCard", () => {
  it("is one link to the Department's page", () => {
    render(<DepartmentCard department={transmissao} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/departamentos/transmissao");
  });

  it("shows the name, summary, primary Tool and Step count inside the link", () => {
    render(<DepartmentCard department={transmissao} />);
    const link = within(screen.getByRole("link"));

    expect(link.getByRole("heading", { name: "Transmissão" })).toBeInTheDocument();
    expect(link.getByText("Live no YouTube do início ao fim")).toBeInTheDocument();
    expect(link.getByText("OBS Studio")).toBeInTheDocument();
    expect(link.getByText("9 passos")).toBeInTheDocument();
  });

  it("counts a single Step in the singular", () => {
    const oneStep: Department = {
      ...transmissao,
      steps: [transmissao.steps[0]],
    };
    render(<DepartmentCard department={oneStep} />);

    expect(screen.getByText("1 passo")).toBeInTheDocument();
  });

  it("keeps the Motif out of the accessibility tree", () => {
    render(<DepartmentCard department={transmissao} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
