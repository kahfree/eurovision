import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
    en:{
        general:{
            test:"This is a test message",
            entrants:"Entrants",
            beforeDate: "Before Date",
            afterDate: "After Date",
            search: "Search",
            edit: "Edit",
            drilldown: "Drilldown",
            home: "Home",
            loading: "Loading",
            save: "Save",
            cancel: "Cancel",
            drilldownTitle: "Entrant with Venue Details",
            entrant: "Entrant",
            value: "Value",
            editTitle: "Edit Entrant",
            firstSearch: "Simple Search",
            secondSearch: "Search Two"
        },
        entrant:{
            entrantID: "Entrant ID",
            logo: "Logo",
            hostCity: "Host City",
            dateOfFinal: "Date of Final",
            hostCountry: "Host Country",
            section: "Section",
            artist: "Artist",
            song: "Song",
            artistCountry: "Artist Country",
            runningOrder: "Running Order",
            totalPoints: "Total Points",
            rank: "Rank",
            qualified: "Qualified"
        },
        venue:{
            venueID: "Venue ID",
            name: "Venue Name",
            capacity: "Venue Capacity",
            note: "Venue Note"
        }
    },
    ga:{
        general:{
            test:"Seo teachtaireacht tástála",
            entrants:"Iontrálaithe",
            beforeDate: "Roimh an Dáta",
            afterDate: "Tar éis an Dáta",
            search: "Cuardaigh",
            edit: "Cuir in Eagar",
            drilldown: "Dromchlaigh",
            home: "Baile",
            loading: "Ag Lódáil",
            save: "Sábháil",
            cancel: "Cealaigh",
            drilldownTitle: "Iontrálaí le Sonraí Ionad",
            entrant: "Iontrálaí",
            value: "Luach",
            editTitle: "Cuir in Eagar Iontrálaí",
            firstSearch: "Cuardach Simplí",
            secondSearch: "Cuardach a Dó"
        },
        entrant:{
            entrantID: "ID Iontrálaí",
            logo: "Lógó",
            hostCity: "Cathair Áitiúil",
            dateOfFinal: "Dáta na Ceannaireachta",
            hostCountry: "Tír Áitiúil",
            section: "Rannóg",
            artist: "Ealaíontóir",
            song: "Amhrán",
            artistCountry: "Tír na nEalaíontóirí",
            runningOrder: "Ord Seinm",
            totalPoints: "Iomlán Pointí",
            rank: "Rang",
            qualified: "Bhí cáilíocht acu"
        },
        venue:{
            venueID: "ID Ionad",
            name: "Ainm an Ionaid",
            capacity: "Cumas an Ionaid",
            note: "Nóta faoin Ionad"
        }
        }
});

export default strings;