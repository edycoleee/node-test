test("array simple", () => {
    const names = ["edy", "kholid", "mawardi"];
    expect(names).toEqual(["edy", "kholid", "mawardi"]);
    expect(names).toContain("edy");
});

test("array object", () => {
    const persons = [
        {
            name: "Edy"
        },
        {
            name: "kholid"
        }
    ];
    expect(persons).toContainEqual({
        name: "Edy"
    });
});