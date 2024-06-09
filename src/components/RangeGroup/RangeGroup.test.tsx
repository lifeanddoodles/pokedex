import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import RangeGroup from "."
import { mockSinglePokemonData } from "../../__mocks__"
import { capitalize, removeDashes } from "../../utils"

describe("RangeGroup", () => {
  test("renders data correctly", () => {
    render(
      <RangeGroup
        label="stats"
        resource={mockSinglePokemonData}
        pathToValue={["stat.name", "base_stat"]}
      />,
    )

    const rangeInputs = screen.getAllByRole("slider")

    rangeInputs.forEach((range, index) => {
      const formattedLabel = removeDashes(
        mockSinglePokemonData.stats[index].stat.name,
      )
      const label = capitalize(formattedLabel)

      expect(range).toHaveAttribute("name", label)
    })
  })
})
