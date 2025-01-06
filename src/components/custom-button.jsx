import styled from "styled-components";

const CustomButton=()=>{
    return (
        <>
            <FirstStyledSweetPotato color={'purple'}>
                고구마
            </FirstStyledSweetPotato>
            <FirstStyledSweetPotato color={'red'}>
                고구마
            </FirstStyledSweetPotato>
        </>
    );
};

export default CustomButton;

const FirstStyledSweetPotato = styled.button`
    background-color:${pros=>pros.color || 'purple'};
    border:none;
    border-radius:10px;
    padding:20px;
    cursor:pointer;
    color:white;
    `