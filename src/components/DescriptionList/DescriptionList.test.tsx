import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DescriptionList, { DescriptionDetails, DescriptionTerm } from "."
import { mockItemsForDescriptionListOdd } from "../../__mocks__"

describe("DescriptionList", () => {
  test("renders data correctly", () => {
    render(
      <DescriptionList>
        {mockItemsForDescriptionListOdd.map(({ label, value }) => (
          <div role="group" key={label}>
            <DescriptionTerm>{label}</DescriptionTerm>
            <DescriptionDetails>{value}</DescriptionDetails>
          </div>
        ))}
      </DescriptionList>,
    )

    const descriptionTerms = screen.getAllByRole("term") as HTMLDListElement[]

    descriptionTerms.forEach((term, index) => {
      expect(term).toHaveTextContent(
        mockItemsForDescriptionListOdd[index].label,
      )
    })
  })
})
