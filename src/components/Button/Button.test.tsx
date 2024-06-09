import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
import { act } from "react"
import Button from "."

describe("Button", () => {
  test("renders correctly", () => {
    render(<Button>Click</Button>)
    const element = screen.getByRole("button")

    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent("Click")
  })

  test("handles onClick event", async () => {
    user.setup()
    const mockOnClick = vi.fn()

    render(<Button onClick={mockOnClick}>Click</Button>)
    const element = screen.getByRole("button")

    await act(async () => {
      await user.click(element)
    })

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
