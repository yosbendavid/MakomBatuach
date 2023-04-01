import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import RegisterTitle from "./RegisterTitle";
import {selectBoxArray} from "./Data/selectBoxArray";
import {textBoxesArray} from "./Data/textBoxesArray";
import backArrow from "../../Photos/backArrow.svg";
import '../../CSS/register.css';

function RegisterBoxs(){
    return(
        <div className="register-boxs-div">
            <img className="back-from-register" src={backArrow} />
            <RegisterTitle />
            <form action="">
                <TextBox 
                    id={textBoxesArray[0].id} 
                    title={textBoxesArray[0].title}
                    placeHolder={textBoxesArray[0].placeHolder}
                    type={textBoxesArray[0].type}
                />
                <TextBox 
                    id={textBoxesArray[1].id} 
                    title={textBoxesArray[1].title}
                    placeHolder={textBoxesArray[1].placeHolder}
                    type={textBoxesArray[1].type}
                />
                <SelectBox
                    id={selectBoxArray[0].id}
                    title={selectBoxArray[0].title}
                    placeHolder={selectBoxArray[0].placeHolder}
                    values={selectBoxArray[0].values}
                />
                <TextBox 
                    id={textBoxesArray[3].id} 
                    title={textBoxesArray[3].title}
                    placeHolder={textBoxesArray[3].placeHolder}
                    type={textBoxesArray[3].type}
                />
                <TextBox 
                    id={textBoxesArray[4].id} 
                    title={textBoxesArray[4].title}
                    placeHolder={textBoxesArray[4].placeHolder}
                    type={textBoxesArray[4].type}
                />
                <br />
                <input className="register-submit-btn" type="submit" value="צור משתמש" />
            </form>

            <p className="have-account-p">יש לך כבר משתמש? <span className="connect-page">התחבר</span></p>
        </div>
    );
}

export default RegisterBoxs;