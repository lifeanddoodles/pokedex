import "@testing-library/jest-dom"
import { render, screen, within } from "@testing-library/react"
import MetaContentContainer from "."
import {
  mockItemsForDescriptionListOdd,
  mockItemsForDescriptionListPair,
} from "../../__mocks__"
import { formatLabel } from "../../utils"

describe("MetaContentContainer", () => {
  test("renders data correctly", () => {
    render(<MetaContentContainer items={mockItemsForDescriptionListPair} />)

    const descriptionTerms = screen.getAllByRole("term") as HTMLDListElement[]

    descriptionTerms.forEach((term, index) => {
      const label = new RegExp(
        formatLabel(mockItemsForDescriptionListPair[index].label),
        "i",
      )
      expect(term).toHaveTextContent(label)
    })
  })

  test("renders items with odd length correctly", async () => {
    render(<MetaContentContainer items={mockItemsForDescriptionListOdd} />)

    const columns = screen.getAllByTestId("meta-container__column")
    const columnLeft = columns[0]
    const columnRight = columns[1]
    const rowsLeft = await within(columnLeft).findAllByRole("group")
    const rowsRight = await within(columnRight).findAllByRole("group")
    const expectedLengthRowsLeft = Math.ceil(
      mockItemsForDescriptionListOdd.length / 2,
    )

    expect(rowsLeft.length).to.equal(expectedLengthRowsLeft)
    expect(rowsRight.length).to.equal(
      mockItemsForDescriptionListOdd.length - expectedLengthRowsLeft,
    )
  })
})
