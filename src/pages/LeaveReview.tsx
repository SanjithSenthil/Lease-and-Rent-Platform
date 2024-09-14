import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import "./Home.css"
interface p {
    setIsOpen: Function
}
const LeaveReview = (props: p) => {
    let [stars, setStars] = useState(0);
    let text = useRef(null)
    useEffect(
        () => {
            if (localStorage.getItem("review")) {
                text.current.value = JSON.parse(localStorage.getItem("review"))[0]
                stars = JSON.parse(localStorage.getItem("review"))[1]
            }
            setStars(stars)
        }, []
    )
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonButton onClick={() => { props.setIsOpen(false) }}>Close</IonButton>
                    </IonButtons>
                    <IonTitle>Leave a Review</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="m-3">
                    {
                        [0, 1, 2, 3, 4].map((x) => {
                            return (
                                <IonIcon key={x} className="text-5xl" icon={x < stars ? star : starOutline} onClick={() => {
                                    setStars(x + 1)
                                }}></IonIcon>
                            )
                        })
                    }
                    <IonTextarea ref={text} placeholder="Leave a review here (optional) ..."></IonTextarea>
                    <IonButton expand="block" onClick={() => {
                        localStorage.setItem("review", JSON.stringify(
                            [text.current.value, stars]
                        ))
                        window.location.reload()
                    }}>
                        Submit
                    </IonButton>
                </div>
            </IonContent>
        </>
    )
}

export default LeaveReview;