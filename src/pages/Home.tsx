import { IonBadge, IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { closeCircleOutline, funnel, mic, person, thumbsUp } from 'ionicons/icons';
import Detail from './Detail';
import { useEffect, useRef, useState } from 'react';

const colormap = (v) => {
  if (v < 50) {
    return "danger"
  }
  if (v < 80) {
    return "warning"
  }
  return "success"
}
interface v {
  setFilter: Function,
  setVoiceOpen: Function
}
function VoiceSearch(props: v) {
  let mediaRecorder = null;
  const [transcript, setTranscript] = useState('Say what you want, like "I want to rent a snowboard on this Thursday, I want it for 7 days, and it should be cheaper than $500 total."')
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          },
        )

        // Success callback
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream); mediaRecorder.start(); let chunks = [];

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
          // setTimeout(()=>{mediaRecorder.stop();}, 1000)
          mediaRecorder.onstop = (e) => {
            const blob = new Blob(chunks, { type: "audio/ogg" }) //cannot define codec
            const audioURL = window.URL.createObjectURL(blob);
            console.log(chunks, blob, audioURL);
            let formData = new FormData()
            formData.append("file", blob)
            formData.append("model", "whisper-1")

            fetch("https://api.openai.com/v1/audio/transcriptions", {
              method: "POST", headers: {
                "Authorization": `Bearer ${localStorage.getItem("APIKey")}`
              },
              body: formData
            }).then(x => x.json()).then(
              (x) => {
                setTranscript("You said: " + x.text)
                fetch("https://api.openai.com/v1/chat/completions", {
                  headers: { Authorization: `Bearer ${localStorage.getItem("APIKey")}`, "Content-Type": "application/json" },
                  method: "POST", body: JSON.stringify(
                    {
                      "model": "gpt-4",
                      "messages": [{
                        "role": "system", "content": "You will get a text input from user, please return a JSON format\
                       (ONLY JSON FORMAT ONLY, NOTHING ELSE) including user's search detial, in format as \
                       {low: lowest price, high: high price, dis: distance from me, time_range: [start_date (YYYY/MM/DD), end date (YYYY/MM/DD)], item_name: name, rating: min_rating }\
                        if name is not said, return null, if low price not said, return 0, if high not said, return Infinity, if rating not said return 0, if dis not said return 100. REMEMBER, ONLY JSON, nothing else, since it will be processed by a JSON engine and user will not drectly see your output. If user provided nothing, return everything as null. Remember DO NOT SAY ANYTHING OTHER THAN THE JSON. current time is. Upper round the distance to [1,5,10,15,20,25,50,100] miles, and under round rating to 20 40 60 80" + Date()
                      }, { "role": "user", "content": x.text }]
                    },
                  )
                }).then(x => x.json()).then(x => { props.setFilter(JSON.parse(x.choices[0].message.content)); props.setVoiceOpen(false); })
              }
            )
          }
        })

        // Error callback
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      alert("getUserMedia not supported on your browser!");
    }
  })
  return (
    <>
      <div className='bg-gray-100 w-full h-full text-center place-content-cente grid'>
        <div className='place-self-center'>
          <IonIcon className="p-5 text-6xl" icon={mic} ></IonIcon>
          <p className='p-5'>{transcript}</p>
          <IonButton onClick={() => { mediaRecorder.stop() }}>Stop</IonButton></div>
      </div>
    </>
  )
}
const Tab1: React.FC = () => {

  let trending_ = [
    {
      "image": "image_7.png","user":"Tom",
      "title": "City Explorer Bicycle",
      "description": "A versatile, lightweight bicycle perfect for urban adventures. Features a comfortable seat, smooth gears, and a durable frame.",
      "price": 15,
      "dis": 9,
      "rating": 38, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "username": "UrbanRider"
    },
    {
      "image": "image_8.png","user":"Kate",
      "title": "Portable Projector",
      "description": "Compact HD projector, ideal for movie nights or presentations. Easy to set up, compatible with various devices, and comes with a carry case.",
      "price": 20,
      "rating": 52,
      "dis": 50, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "username": "TechEnthusiast"
    },
    {
      "image": "image_6.png","user":"Lucy",
      "title": "Professional Camera Kit",
      "description": "A high-quality DSLR camera with multiple lenses, perfect for photography enthusiasts. Includes a tripod, carry bag, and memory cards.",
      "price": 40,
      "rating": 85,
      "dis": 27, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "username": "Shutterbug"
    },
    {
      "image": "image_5.png","user":"John",
      "title": "Beach Day Package",
      "description": "Everything you need for a perfect day at the beach: includes a sun umbrella, two chairs, a cooler, and beach toys.",
      "price": 25,
      "rating": 20,
      "dis": 23, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "username": "SandyToes"
    },
    {
      "image": "image_4.png","user":"Indy",
      "title": "Camping Adventure Gear",
      "description": "A complete camping set with a tent, sleeping bags, cooking equipment, and a portable stove. Perfect for outdoor enthusiasts.",
      "price": 35,
      "rating": 43, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "username": "NatureLover",
      "dis": 18

    },

    {
      "id": 1,
      "image": "/image_9.png","user":"Mindy",
      "title": "Advanced HPLC-ESI-MS",
      "description": "High-Performance Liquid Chromatography with Electrospray Ionization Mass Spectrometry equipment, ideal for detailed chemical analysis. Available for short-term lease for research purposes.",
      "from": "Dr. Rachel K.",
      "price": 2000,
      "rating": 80, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "dis": 10
    },
    {
      "image": "image_3.png","user":"Pop",

      "title": "Universal Smartphone Charger",
      "description": "A fast-charging and versatile smartphone charger compatible with multiple devices. Features overcharge protection and a compact design.",
      "price": 5,
      "rating": 85, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "dis": 10,
      "username": "ChargeMaster"
    },
    {
      "image": "image_2.png","user":"Marshall",

      "title": "Mystery Thriller Novel",
      "description": "A gripping and suspenseful mystery novel by a bestselling author. Perfect for fans of thrilling stories and complex characters.",
      "price": 3,
      "rating": 80, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "dis": 30,

      "username": "Bookworm"
    },
    {
      "image": "image_1.png","user":"Wayne",

      "title": "Insulated Winter Coat",
      "description": "A stylish and warm winter coat, suitable for extreme cold. Features waterproof material, a detachable hood, and inner thermal lining.",
      "price": 18,
      "dis": 50, "location": [49.87983161008547, -119.51243074768813], startDate:"Dec 23, 2023", endDate:"Dec 30, 2023",
      "rating": 91,
      "username": "WinterWardrobe"
    }

  ];
  useEffect(() => {
    let new_items = JSON.parse(localStorage.getItem("newItems") || "[]");
    for (var i = 0; i < new_items.length; i++) {
      new_items[i].id = 1;
      new_items[i].dis = 0;
    }
    trending_ = trending_.concat(new_items)

    console.log(trending_)
  }, [])
  const [info, setInfo] = useState({});
  const [isDetileOpen, setDetileOpen] = useState(false);
  const [filter, setFilter] = useState({ item_name: "", low: 0, high: Infinity, rating: 0, dis: Infinity });
  const defaultFilter = { item_name: "", low: 0, high: Infinity, rating: 0, dis: Infinity };
  const popover = useRef(null);
  const [isVoiceOpen, setVoiceOpen] = useState(false);
  const [itemId, setItemId] = useState(-1);
  const [trending, setTrending] = useState(trending_);
  useEffect(() => { localStorage.getItem("APIKey") || localStorage.setItem("APIKey", prompt("Enter Your API Key")) }, [])
  useEffect(() => {
    if (!filter.item_name) {
      // setTrending([...trending_])
      // return;
      filter.item_name = ""
    }
    setTrending([...trending_.filter((x) => {
      //@ts-ignore
      return x.title.toLowerCase().includes(filter.item_name.toLowerCase())
    }).filter(x => {
      return filter.low < x.price && x.price < filter.high
    }).filter(x => {
      return x.rating > filter.rating
    }).filter(x => {
      return x.dis < filter.dis
    })])
  }, [filter])
  return (
    <IonPage>
      <IonModal isOpen={isVoiceOpen}>
        <VoiceSearch setFilter={setFilter} setVoiceOpen={setVoiceOpen}></VoiceSearch>
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rentify</IonTitle>
          <IonButtons collapse={true} slot="end">
            <IonButton><IonIcon aria-hidden="true" icon={person} /></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonModal isOpen={isDetileOpen}>
          <Detail setDetileOpen={setDetileOpen} itemId={itemId} info={info}></Detail>
        </IonModal>
        <div>

          <IonRow>
            <IonCol size="auto" className='grid text-center place-content-center m-2'><IonIcon id="filter" icon={funnel} className="text-xl"></IonIcon></IonCol>
            <IonCol className="m-0 p-0"><IonSearchbar value={filter.item_name} className="pl-0 ml-0 mr-0 pr-0" placeholder="Default" onIonChange={(e) => {
              console.log(e.detail.value)
              filter.item_name = e.detail.value;
              setFilter({ ...filter })
              console.log(filter)
            }}></IonSearchbar></IonCol>
            <IonCol size="auto" className='grid text-center place-content-center m-2'><IonIcon icon={mic} className="text-xl" onClick={() => { setVoiceOpen(true) }}></IonIcon></IonCol>

          </IonRow>
          <div className='p-3'>
            {
              Object.keys(filter).map((x, index) => {
                const filterLabel = { low: "Min Price: $", high: "Max Price: $", rating: "Min Rating: ", dis: "Miles to me: " };

                if (filter[x] != defaultFilter[x] && x != "item_name") {
                  return <IonBadge>{filterLabel[x]}{filter[x]} <IonIcon onClick={() => {
                    filter[x] = defaultFilter[x];
                    setFilter({ ...filter })
                  }} icon={closeCircleOutline}></IonIcon></IonBadge>
                }
              })
            }
          </div>
        </div>
        <div className='grid grid-cols-2'>
          {
            trending.map((x, index) => (
              <IonCard key={index} onClick={() => {
                setDetileOpen(true);
                setInfo(x);
                setItemId(x.id);
              }} className="p-3 m-1 max-h-half">
                <img src={x.image} className='width-full mb-1'></img>
                <IonBadge>CA${x.price}/day</IonBadge>
                <IonBadge className="ml-1" color={colormap(x.rating)}><IonIcon icon={thumbsUp}></IonIcon>{x.rating}%</IonBadge><br />
                <IonLabel>  <h3>{x.title}</h3>
                  <p>{x.description}</p></IonLabel>
              </IonCard>
            ))
          }
        </div>
        <IonPopover style={{ "--min-width": "80%" }} trigger="filter" ref={popover} triggerAction="click">
          <IonContent style={{ width: "100%" }} class="ion-padding">
            <IonList>
              <IonItem>
                <IonLabel>Lowest Price: </IonLabel>
                <IonInput value={filter.low} onIonChange={(e) => {
                  console.log(filter)
                  filter.low = Number(e.target.value);
                  setFilter({ ...filter })
                }}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Highest Price: </IonLabel>
                <IonInput value={filter.high} onIonChange={(e) => {
                  console.log(filter)
                  filter.high = Number(e.target.value);
                  setFilter({ ...filter })
                }}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Distance from me</IonLabel>
                <IonSelect value={filter.dis} onIonChange={(e) => {
                  filter.dis = (e.target.value)
                  setFilter({ ...filter })
                }}>
                  {
                    [1, 5, 10, 15, 20, 25, 50, 100].map(x => (
                      <IonSelectOption value={x}><IonIcon icon={thumbsUp}></IonIcon>{x} miles</IonSelectOption>
                    ))
                  }
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Min Rating</IonLabel>
                <IonSelect value={filter.rating} onIonChange={(e) => {
                  filter.rating = (e.target.value)
                  setFilter({ ...filter })
                }}>
                  {
                    [0, 20, 40, 60, 80].map(x => (
                      <IonSelectOption value={x}><IonIcon icon={thumbsUp}></IonIcon>{x}% Positive</IonSelectOption>
                    ))
                  }
                </IonSelect>
              </IonItem>
              <IonButton expand="block" onClick={() => {
                popover.current.dismiss()
              }}>Apply Filter</IonButton>
            </IonList>
          </IonContent>
        </IonPopover>
      </IonContent>
    </IonPage >
  );
};

export default Tab1;
