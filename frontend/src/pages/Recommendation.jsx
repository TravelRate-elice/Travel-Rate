import React, {useState} from "react";
import { SearchBar } from "../components/recommendation/SearchBar";
import { NationCard } from "../components/recommendation/NationCard";

const Recommendation = () => {

    const [showNationCard, setShowNationCard] = useState(false)

    const handleSearchClick = () => {
        setShowNationCard(true)
    }

    return (
        <>
            <SearchBar onSearchClick={handleSearchClick} />
            {showNationCard && <NationCard />}
        </>
    )
}

export default Recommendation;