import TagList from "@/components/TagList";

describe("TagList", () => {
  it("should render <tags>", async () => {
    render(<TagList />);

    // await waitFor(() => {
    //   const tagList = screen.getAllByRole("listitem");
    //   expect(tagList.length).toBeGreaterThan(0);
    // });

    const tagList = await screen.findAllByRole("listitem");
    expect(tagList.length).toBeGreaterThan(0);
  });
});
