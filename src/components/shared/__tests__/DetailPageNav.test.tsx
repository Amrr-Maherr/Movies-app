import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailPageNav from "../DetailPageNav";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    button: ({ children, className, ...props }: any) => (
      <button className={className} {...props}>
        {children}
      </button>
    ),
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

describe("DetailPageNav", () => {
  const renderNav = (
    type: "movie" | "tv" | "person",
    activeTab = "overview",
  ) => {
    return render(
      <MemoryRouter>
        <DetailPageNav
          type={type}
          activeTab={activeTab as any}
          onTabChange={() => {}}
        />
      </MemoryRouter>,
    );
  };

  describe("Movie Navigation", () => {
    it("should render all movie navigation items", () => {
      renderNav("movie");

      expect(screen.getByLabelText("Overview")).toBeInTheDocument();
      expect(screen.getByLabelText("Reviews")).toBeInTheDocument();
      expect(screen.getByLabelText("Videos")).toBeInTheDocument();
      expect(screen.getByLabelText("Images")).toBeInTheDocument();
      expect(screen.getByLabelText("Watch")).toBeInTheDocument();
      expect(screen.getByLabelText("Credits")).toBeInTheDocument();
      expect(screen.getByLabelText("More")).toBeInTheDocument();
    });

    it("should highlight active navigation item", () => {
      renderNav("movie", "reviews");

      const buttons = screen.getAllByLabelText("Reviews");
      expect(buttons[0]).toHaveClass("bg-red-600");
    });
  });

  describe("TV Show Navigation", () => {
    it("should render all TV show navigation items", () => {
      renderNav("tv");

      expect(screen.getByLabelText("Overview")).toBeInTheDocument();
      expect(screen.getByLabelText("Reviews")).toBeInTheDocument();
      expect(screen.getByLabelText("Videos")).toBeInTheDocument();
      expect(screen.getByLabelText("Images")).toBeInTheDocument();
      expect(screen.getByLabelText("Watch")).toBeInTheDocument();
      expect(screen.getByLabelText("Credits")).toBeInTheDocument();
      expect(screen.getByLabelText("More")).toBeInTheDocument();
    });

    it("should use clapperboard icon for TV overview", () => {
      renderNav("tv");

      const overviewButtons = screen.getAllByLabelText("Overview");
      expect(overviewButtons[0].innerHTML).toContain("svg");
    });
  });

  describe("Person Navigation", () => {
    it("should render person-specific navigation items", () => {
      renderNav("person");

      expect(screen.getByLabelText("Overview")).toBeInTheDocument();
      expect(screen.getByLabelText("Movies")).toBeInTheDocument();
      expect(screen.getByLabelText("TV Shows")).toBeInTheDocument();
      expect(screen.getByLabelText("Photos")).toBeInTheDocument();
    });

    it("should not show movie/TV-specific items for person", () => {
      renderNav("person");

      expect(screen.queryByLabelText("Reviews")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Watch")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Credits")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("More")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper navigation role", () => {
      renderNav("movie");

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Detail page navigation");
    });

    it("should set aria-selected on active tab", () => {
      renderNav("movie", "videos");

      const activeButtons = screen.getAllByLabelText("Videos");
      expect(activeButtons[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Responsive Design", () => {
    it("should render mobile navigation", () => {
      renderNav("movie");

      const mobileNav = document.querySelector(".md\\:hidden");
      expect(mobileNav).toBeInTheDocument();
    });
  });
});
