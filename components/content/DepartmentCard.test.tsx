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

  it("says nothing about construction on a Department that is ready", () => {
    render(<DepartmentCard department={department} />);

    expect(screen.queryByText("Em construção")).not.toBeInTheDocument();
  });

  describe("under construction", () => {
    const unfinished = aDepartment({ underConstruction: true });

    it("names the Department and says it is under construction", () => {
      render(<DepartmentCard department={unfinished} />);

      expect(
        screen.getByRole("heading", { name: unfinished.name }),
      ).toBeInTheDocument();
      expect(screen.getByText("Em construção")).toBeInTheDocument();
    });

    it("leads nowhere", () => {
      render(<DepartmentCard department={unfinished} />);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });
});
