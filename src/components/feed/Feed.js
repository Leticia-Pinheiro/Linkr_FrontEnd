import styled from 'styled-components'
import {useState} from 'react'

export default function Feed(){
    const  [ showLogout ,  setShowLogout ]  =  useState ( false )  

    function  showOrHide () {        
        setShowLogout  (  !  showLogout  )      
    }
    
    return(
        <Container disabled={showLogout}>
            <Header>
                <h1>linkr</h1>

                <div>                    
                    {showLogout?
                        <ion-icon name="chevron-up-outline" onClick = {showOrHide}></ion-icon>
                        : 
                        <ion-icon name="chevron-down-outline" onClick = {showOrHide}></ion-icon>
                    } 
                     
                    <div></div>               
                </div>
            </Header>

            {showLogout?
                <Logout>
                    Logout
                </Logout> 
             : null}
              
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    `

const Header = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    
    h1{
        font-size: 49px;
        font-weight: bold;
        font-family: 'Passion One', cursive;
        color: #ffffff;
        margin-left: 28px;

        @media (max-width: 700px) {
            font-size: 45px;
            margin-left: 17px;
        }
    }
    
    div{
        display: flex;
        align-items: center;        

        ion-icon{
            color: #ffffff;
            font-size: 30px;
            cursor: pointer;
            margin-right: 17px;

            @media (max-width: 700px) {
                font-size: 25px;
                margin-right: 12px;
            }
        }
        div{
            width: 53px;
            height: 53px;
            border-radius: 50%;
            background-color: #ffffff;
            margin-right: 17px;

            @media (max-width: 700px) {
                width: 44px;
                height: 44px;
                margin-right: 14px;
            }
        }
    }`

const Logout = styled.div`
    width: 150px;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;    
    margin-top: 72px;
    font-family: 'Lato';
    font-size: 17px;
    font-weight: bold;
    color: #ffffff;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    position: fixed;
    right: 0;
    cursor: pointer;
    `