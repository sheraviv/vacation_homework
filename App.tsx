
   
import React, { Component, ReactElement, useState } from 'react';
import logo from './logo.svg';
import './App.css';





const data = [{
  "id": "1",
  "name": "Moscow",
  "description": "Never been there",
  "image": "https://www.itravelkosher.com/wp-content/uploads/2017/07/moscow-travel-RUSSIA0317-300x300.jpg"
},  ]

function AddVacation(props: { addProduct: Function }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  return <div className='mb-4'>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
      </div>
      <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
    </div>

    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">Image</span>
      </div>
      <input type="text" onChange={(e) => { setImage(e.target.value) }} className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
    </div>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">Description</span>
      </div>
      <textarea style={{height:"50px"}} onChange={(e) => { setDescription(e.target.value) }}  aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
    </div>

    <div className="input-group input-group-sm">
      <button className='btn btn-success' onClick={() => {
        props.addProduct({ name, image, description: description, id: `${name}_${Math.ceil(Math.random() * 1000)}` })
      }} > add</button>
    </div>

  </div>
}

function VacationsPage() {
  const [vacationsGlobal, setProductsGlobal] = useState(data)
  function _deleteCard(id: string) {
    if (!id) return;
    const newVacations = vacationsGlobal.filter(p => p.id !== id);
    setProductsGlobal([...newVacations])
  }

  return (
    <div className='container'>
      <div className="row mb-4">
        <div className={`col align-self-start `} >
        </div>
      </div>
      <div className="row">
        <AddVacation addProduct={(productObject: any) => {
          setProductsGlobal([...vacationsGlobal, productObject])
        }} />
      </div>
      <div className="row" >
        <VacationCards onDeleteFn={_deleteCard} vacations={vacationsGlobal} />

      </div>
    </div>

  )

}


function VacationCards(props: { vacations: Array<any>, onDeleteFn: Function }) {
  if (!Array.isArray(props.vacations)) return null;
  return (<div>
    {props.vacations.map((vacation) => {
      const { image, name, description, id } = vacation
      return <Vacation onDeleteFn={(id: string) => { props.onDeleteFn(id) }} key={id} id={id} name={name}
       imageUrl={image}
        description={description} />
    })}
  </div>)

}


interface ISuperHeaderProps {
  headerText: string
}



function SuperHeader(props: ISuperHeaderProps): any | undefined {
  const initialState: boolean = false;
  const [isSelected, setIsSelected] = useState(initialState)

  const { headerText } = props
  const currentHeader = headerText || "Default_Mssing_Header"
  
 
  return <div style={{ cursor: "pointer" }} >
    <h1 onClick={() => {
      setIsSelected(!isSelected)
    }} style={{ color: "black", background: isSelected ? "yellow" : "white" }}> {currentHeader}
    </h1>
  </div>
}

interface IImageProps {
  imageUrl?: string,
  height?: number,
  width?: number
}

function ImageComponent(props: IImageProps) {
  const { imageUrl, height, width } = props;
  const defaultImage: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
  const image = imageUrl || defaultImage
  return <img src={image} height={height || 150} width={width || 150} />
}

function Vacation(props: {
  name: string,
  imageUrl: string, description: string, id: string, onDeleteFn: Function
}) {
  const { name, description, imageUrl, id } = props;

  return (
    <div className="card" style={{
      border: "solid 2px black", padding:"40px",margin:"10px", 
      display: "inline-block", width: "250px", height: "400px",
    }}>
      <h1> {name} </h1>
      <h2> {description}  </h2>
      <ImageComponent imageUrl={imageUrl} />
      <div>
        <button className='btn btn-danger mt-4' onClick={() => {
          props.onDeleteFn(id)
        }}> Delete </button>
      </div>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <SuperHeader headerText="Vacations List"/>
      <VacationsPage />
    </div >
  );

}

export default App;


