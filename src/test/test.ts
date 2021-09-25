import "mocha";
import "should";
import PGParams from "../index.js";

const objParams = {
  id: 100,
  location: "bangalore",
  name: "jeswin",
  timezone: "GMT+530",
};

describe("pg-params", async () => {
  it("creates params", () => {
    const params = new PGParams(objParams);

    params.args.should.deepEqual([
      ["id", 1, 100],
      ["location", 2, "bangalore"],
      ["name", 3, "jeswin"],
      ["timezone", 4, "GMT+530"],
    ]);
  });

  it("returns a list of columns", () => {
    const params = new PGParams(objParams);
    params.columns().should.equal(`"id", "location", "name", "timezone"`);
  });

  it("returns a column-arg pair", () => {
    const params = new PGParams(objParams);
    params.pair("timezone").should.equal(`"timezone"=$4`);
  });

  it("returns column-arg pairs", () => {
    const params = new PGParams(objParams);
    params
      .pairs(["location", "timezone"])
      .should.equal(`"location"=$2, "timezone"=$4`);
  });

  it("returns numbered params", () => {
    const params = new PGParams(objParams);
    params.id("name").should.equal("$3");
  });

  it("returns a list of parameter names", () => {
    const params = new PGParams(objParams);
    params.ids().should.equal("$1, $2, $3, $4");
  });

  it("returns an array of values", () => {
    const params = new PGParams(objParams);
    params.values().should.deepEqual([100, "bangalore", "jeswin", "GMT+530"]);
  });
});
