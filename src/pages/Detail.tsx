import { faker } from "@faker-js/faker"
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar } from "@ionic/react"
import "./Home.css"
import { bookmark, bookmarkOutline, chatbox, chevronBack, thumbsUp } from "ionicons/icons"
import { useState } from "react"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ViewReview from "./ViewReview"


interface detail { setDetileOpen: Function, itemId: Number, info: Object };

const Detail = (props: detail) => {
  // let endDate = "Dec 30, 2023"
  const [icon, setIcon] = useState(bookmarkOutline);
  const [calendarOpen, setCalenderOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState([])
  const [expandReview, setExpandReview] = useState(false);
  const detail = {
    //@ts-ignore
    image: props.info.image,
    //@ts-ignore
    name: props.info.title,
    //@ts-ignore
    description: props.info.description,
    location: [49.9975, -119.4710],
    price: 123.78
  }
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: Date(),
      key: 'selection'
    }
  ]);
  return (
    <>
      <IonModal isOpen={open}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Owner of {props.info.title}</IonTitle>
            <IonButtons>
              <IonButton onClick={() => { setOpen(false) }}><IonIcon aria-hidden="true" icon={chevronBack} /></IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {
            chat.map((x, index) => {
              if (!x.content) {
                return (<></>)
              }
              if (x.role == "user") {
                return (
                  <div className='rounded-lg bg-sky-300 float-right p-2 m-2 ml-4 mr-4 w-9/12'>
                    {x.content}
                  </div>
                )
              }
              else if (x.role != "system")
                return (
                  <div className='float-left'>
                    <img className="rounded-full aspect-square w-9 float-left m-2" src={faker.image.urlLoremFlickr({ category: 'abstract' })}></img>
                    <div className='rounded-lg bg-gray-300 p-2 m-2 ml-12 mr-4 w-9/12'>
                      {x.content}
                    </div>
                  </div>
                )
            })
          }

        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonInput id="inp" placeholder='Input message here' onIonChange={() => {
              //@ts-ignore
              chat.push({ role: "user", content: document.getElementById("inp").value })
              setChat([...chat])

              fetch("https://api.openai.com/v1/chat/completions", {
                headers: { Authorization: `Bearer ${localStorage.getItem("APIKey")}`, "Content-Type": "application/json" },
                method: "POST", body: JSON.stringify(
                  {
                    "model": "gpt-4",
                    "messages": chat
                  }
                )
              }).then(x => x.json()).then(x => {
                chat.push({ role: "assistant", content: x.choices[0].message.content })
                setChat([...chat])
              }

              )
              //@ts-ignore
              document.getElementById("inp").value = ""
            }}></IonInput>
            {/* <IonButtons slot="end"><IonButton onTouchStart={()=>{
              //@ts-ignore
              if(!document.getElementById("inp").value)
              {
                return
              }
              chat.push({username: "user", content: [document.getElementById("inp").value]})
              setChat([...chat])
              //@ts-ignore
              document.getElementById("inp").value = ""
            }}><IonIcon icon={paperPlane}></IonIcon></IonButton></IonButtons> */}
          </IonToolbar>
        </IonFooter>

      </IonModal>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail</IonTitle>
          <IonButtons>
            <IonButton onClick={() => { props.setDetileOpen(false) }}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => {
              if (icon == bookmarkOutline) {
                setIcon(bookmark)
                localStorage.setItem("saved", (1 + Number(localStorage.getItem("saved"))).toString())
              }
              else {
                setIcon(bookmarkOutline)
                localStorage.setItem("saved", (Number(localStorage.getItem("saved")) - 1).toString())
              }
            }} ><IonIcon icon={icon} key={icon}></IonIcon></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal isOpen={calendarOpen}>
          <IonPage>
            <DateRange
              className="w-full"
              onChange={item => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              minDate={(new Date(props.info.startDate))}
              maxDate={(new Date(props.info.endDate))}
              editableDateInputs={true}
              direction="horizontal"
            />
            <IonText>Click the starting date then the end date</IonText>
            <IonButton size="large" expand="block" onClick={() => {
              // @ts-ignore
              props.info.state = state
              localStorage.setItem("history", JSON.stringify(props.info))
              alert("Booked");
              setCalenderOpen(false);
              setTimeout(() => {
                props.setDetileOpen(false)
              }, 300)
            }}>Book</IonButton>


          </IonPage>
        </IonModal>
        <img src={detail.image} className="p-5 rounded-3xl"></img>
        <IonItem><b className="pr-2">Name: </b> {detail.name}</IonItem>
        <IonItem>
          <p><b>Description:</b> <br />{detail.description}</p>
        </IonItem>
        <IonItem>
          <b className="pr-3">Available Dates:</b>{props.info.startDate} - {props.info.endDate} <IonButton slot="end" onClick={() => {
            setCalenderOpen(true);
          }}>Book</IonButton>
        </IonItem>
        <IonItem><b className="pr-2">Price:</b> ${props.info.price} <span className="pl-5 pr-5"></span></IonItem>
        {/* Rating: {props.info.rating}%</IonItem> */}
        <IonItem><img className="rounded-full w-20 p-3" src={"/image_10.png"}></img><IonText><h4>{props.info.user}</h4><IonProgressBar value={props.info.rating / 100} color="success"></IonProgressBar><p className="w-full"><IonIcon icon={thumbsUp}></IonIcon>{props.info.rating}%</p></IonText><IonButton className="p-3" onClick={() => { setExpandReview(!expandReview) }}>{expandReview ? "Hide" : "Show"} Review</IonButton></IonItem>
        {
          expandReview && <ViewReview></ViewReview>
        }
        <span className="p-5"><b>Location: </b></span><br /><IonItem><img width="100%" src={"https://maps.googleapis.com/maps/api/staticmap?center=" + props.info.location[0] + "," + props.info.location[1] + "&markers=" + props.info.location[0] + "," + props.info.location[1] + "&zoom=12&size=800x400&key="}></img></IonItem>
        <IonButton expand="block" onClick={() => { setOpen(true) }}><IonIcon icon={chatbox}></IonIcon>Chat with owner</IonButton>
        {/* 
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton>
                    <IonIcon icon=""></IonIcon>
                    </IonFabButton>
                </IonFab> */}
      </IonContent>
    </>
  )
}

export default Detail;