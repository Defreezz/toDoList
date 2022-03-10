import React from "react";
import s from "./PageNotFound.module.css"


export const PageNotFound = () => {
    return (
        <div className={s.container}>
            <header className={s.topHeader}>
            </header>
            <div>
                <div className={s.starsec}></div>
                <div className={s.starthird}></div>
                <div className={s.starfourth}></div>
                <div className={s.starfifth}></div>
            </div>


            <div className={s.lamp__wrap}>
                <div className={s.lamp}>
                    <div className={s.cable}></div>
                    <div className={s.cover}></div>
                    <div className={s.inCover}>
                        <div className={s.bulb}></div>
                    </div>
                    <div className={s.light}></div>
                </div>
            </div>

            <section className={s.error}>

                <div className={s.error__content}>
                    <div className={s.error__message}>
                        <h1 className={s.message__title}>Page Not Found</h1>
                    </div>
                </div>


            </section>

        </div>
    )
}