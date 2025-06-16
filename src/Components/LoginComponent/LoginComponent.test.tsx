import {render,screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import { LoginComponent } from "./LoginComponent"
import userEvent from "@testing-library/user-event";
test("check if two inputs are on the page", ()=>{
    render(<LoginComponent/>);
    
    expect (screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect (screen.getByLabelText(/Password/i)).toBeInTheDocument();

})
test("to check if input value change when user type", async ()=>{
 
    render(<LoginComponent/>);
    const emailInput=screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput=screen.getByLabelText(/Password/i) as HTMLInputElement;
    await userEvent.type(emailInput,"example@gmail.com");
  await userEvent.type(passwordInput,"hello123");
    expect(emailInput.value).toBe("example@gmail.com");
    expect(passwordInput.value).toBe("hello123");


})

