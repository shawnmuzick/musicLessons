import React, {useEffect, useState}from 'react'
import MainMenu from "../mainMenu/MainMenu";
import Footer from "../components/Footer";
import DailyView from "../views/dailyView/DailyView";

export default function Main(props) {
    const [view, setView] = useState(<DailyView />);
    useEffect(() => {}, [view]);

    const viewHandler = newView => {
      setView(newView);
    };
    return (
        <main className="main">
        {props.menuState === true ? <MainMenu setView={viewHandler} /> : null}
        <div className="inner">
          {view}
          <Footer />
        </div>
      </main>
    )
}
