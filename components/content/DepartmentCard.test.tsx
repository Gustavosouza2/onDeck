import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { aDepartment, aRunbook } from "@/test/fixtures";

import { DepartmentCard } from "./DepartmentCard";

const department = aRunbook();

describe("DepartmentCard", () => {
  it("is one link to the Department's page", () => {
    render(<DepartmentCard department={department} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `/departamentos/${department.slug}`,
    );
  });

  it("shows the name, summary, primary Tool and Step count inside the link", () => {
    render(<DepartmentCard department={department} />);
    const link = within(screen.getByRole("link"));

    expect(
      link.getByRole("heading", { name: department.name }),
    ).toBeInTheDocument();
    expect(link.getByText(department.summary)).toBeInTheDocument();
    expect(link.getByText(department.tool)).toBeInTheDocument();
    expect(link.getByText("9 passos")).toBeInTheDocument();
  });

  it("counts a single Step in the singular", () => {
    render(<DepartmentCard department={aDepartment()} />);

    expect(screen.getByText("1 passo")).toBeInTheDocument();
  });

  it("keeps the Motif out of the accessibility tree", () => {
    render(<DepartmentCard department={department} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
