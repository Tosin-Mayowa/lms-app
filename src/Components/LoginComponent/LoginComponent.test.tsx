import {render,screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import { LoginComponent } from "./LoginComponent"

test("check if two inputs are on the page", ()=>{
    render(<LoginComponent/>);
    
    expect (screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect (screen.getByLabelText(/Password/i)).toBeInTheDocument();

})

