import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Post.css';
import { images } from 'ionicons/icons';
import { useState } from 'react';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const Tab3: React.FC = () => {
  const catOptions = ["Books", "Sport Gears", "Electronics", "Others"];
  const [image, setImage] = useState("");
  const [display, setDisplay] = useState(false)
  const [loc, setLoc] = useState([])
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: "",
  });
  return (
    <IonPage>
      <input type='file' hidden id="file" onChange={(e) => {
        let reader = new FileReader();
        let res = reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          console.log(reader.result)
          //@ts-ignore
          setImage(reader.result)
        }
      }}></input>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Post a new Listing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div onClick={() => {
          //@ts-ignore
          document.getElementById("file").click()
        }} className='m-5 bg-slate-200 h-2/6 rounded-lg grid text-center place-content-center'>
          {/* now i do not need text-center wtf oh i have child in div */}
          <div>
            {
              !image ? <><IonIcon icon={images} className="text-4xl"></IonIcon>
                <p>Add a photo here</p></>
                : <img src={image}></img>
            }
          </div>
        </div>
        <IonList>
          <IonItem>
            <IonInput label="Title" id="title" placeholder='Input your title here'></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea label="Description" id="des" placeholder='Input your text here'></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel>Location</IonLabel>
            <input
              id="loc"
              onFocus={()=>{setDisplay(true)}}
              onBlur={()=>{setTimeout(()=>{setDisplay(false)},100)}}
              placeholder="Location"
              onChange={(evt) => {
                getPlacePredictions({ input: evt.target.value });
              }}
            // loading={isPlacePredictionsLoading}
            />
          </IonItem>
          <IonItem hidden={!display}>
            <IonList>            {
              isPlacePredictionsLoading ? <p>Loading</p> :
                <>{placePredictions.map((item) => (<IonItem onClick={()=>{
                 (document.getElementById("loc") as HTMLInputElement).value =item.description
                 fetch("https://maps.googleapis.com/maps/api/geocode/json?place_id="+item.place_id+"&key=").then(x=>x.json()).then((x)=>{
                    setLoc([x.results[0].geometry.location.lat, x.results[0].geometry.location.lng]);
                    console.log(loc)
                 })
                 console.log(item)
                }}>{item.description}</IonItem>))}</>
            }</IonList>
          </IonItem>
          <IonItem>
            <IonSelect interface="action-sheet" label="Category">
              {
                catOptions.map(x => (
                  <IonSelectOption key={x} value={x}>{x}</IonSelectOption>
                ))
              }
            </IonSelect>
          </IonItem>
          <IonItem>Select dates you want to rent out your item below</IonItem>
          <IonItem><IonLabel>Start Date</IonLabel><input id="sd" type="date"/></IonItem>
          <IonItem><IonLabel>End Date</IonLabel><input id="ed" type="date"/></IonItem>
          <IonItem>
            <IonInput type="number" id="price" label="Price" placeholder='Enter price'></IonInput>
          </IonItem>
          <IonButton className="m-3" expand='block' onClick={() => {
            setTimeout(() => {
              let tmp = JSON.parse(localStorage.getItem("newItems")) || []
              console.log(loc)
              tmp.push({
                image: image,
                rating: 100,
                location: loc,
                startDate: document.getElementById("sd").value,
                endDate: document.getElementById("ed").value,
                // @ts-ignore
                title: document.getElementById("title").value, description: document.getElementById("des").value, price: document.getElementById("price").value
              })
              localStorage.setItem("newItems", JSON.stringify(tmp))
              alert("Submited!")
              window.location.href = window.location.href
            }, 500)
          }}>Submit</IonButton>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
