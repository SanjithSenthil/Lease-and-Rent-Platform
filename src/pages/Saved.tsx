import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Chat.css';

const items = [
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

const Tab4: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Saved Items</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Saved Items</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList lines="none" key={localStorage.getItem("saved")}>
            {
              items.slice(0, Number(localStorage.getItem("saved"))).map((x, index) => (
                <IonItem key={index} className='p-2'>
                  <img src={x.image} className='w-20 rounded-lg'></img>
                  <IonLabel className='p-3'>{x.title}</IonLabel>
                </IonItem>
              ))
            }
          </IonList>
        </IonContent>
      </IonPage>
    </>
  )
};

export default Tab4;
