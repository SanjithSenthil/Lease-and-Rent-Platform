import { IonIcon, IonText } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

const ViewReview = () => {
    let [reviews, setReviews] = useState([

        ["Great Value, would recommond!", 5],

        ["Fine, owner is nice although item is old.", 4],

        ["Owner did not show up", 1]
    ])
    // if (localStorage.getItem("review"))
    // {
    //     // console.log(localStorage.getItem("review"))
    //     reviews.push(JSON.parse(localStorage.getItem("review")))
    //     setReviews([...reviews])
    // }
    useEffect(() => {
        const savedReview = localStorage.getItem("review");
        if (savedReview) {
            const newReview = JSON.parse(savedReview);
            setReviews(prevReviews => [...prevReviews, newReview]);
        }
    }
        , [])
    return (
        <><div className="p-4">
            <h3>Review</h3>
            {

                reviews.map((item, index) => {
                    console.log(reviews);
                    return (
                        <div key={index} className="p-4">
                            <>
                                {
                                    [0, 1, 2, 3, 4].map((x) => (
                                        //@ts-ignore
                                        <IonIcon className="text-5xl" icon={x < item[1] ? star : starOutline} onClick={() => {
                                        }}></IonIcon>
                                    ))
                                }
                                <br />
                                <IonText>{item[0]}</IonText>
                            </>
                        </div>
                    )
                })
            }

        </div></>

    )
}

export default ViewReview;