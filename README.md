# Webapp with React + Spring Boot :coffee:
## Functionality :clipboard:
The backend of this project is a REST controller built in Java with Spring Boot. The frontend is built in Javascript using React.
The frontend has three pages
1. List all entrants with two searches
2. Edit entrant
3. Drilldown on entrant

The list page has two searches
1. Simple search - search by artist country, a before date, and an after date to get a list of entrants from that artist country within that date range.
2. Search two - search by host country, venue capacity and entrant section to get a list of entrants from the host country at a venue under the specified capacity that made it to the specified section.

## Development Efforts :construction_worker:
## Week 1 (13-02-23 - 19-02-23) :hammer:
- Updated the entities in the starter code
- Added 'getAll' endpoints for entrants and venues (`/entrants` and `/venues/`)
- Added simple search endpoint `/entrants/{country}/{startDate}/{endDate}`

## Week 2 (20-02-23 - 26-02-23) :factory:
### 20-02 (Starter code)
- Created React frontend to list all entrants to home page.
### 21-02 (List all & started edit)
- Created 'List all entrants' `EntrantList` Component.
- Made blank `EntrantEdit` component 
- Added get entrant by ID endpoint `/entrants/{id}`
- Added `AppNavBar` component to frontend
### 22-02 (Simple search & drilldown)
- Created simple search on frontend and connected to backend
- Started `EntrantDrilldown` component
- Edited `EntrantDrilldown` to contain venue info
### 23-02 (Finishing edit + drilldown & Localisation)
- Added endpoint to get entrant logo by entrant ID `/entrants/image/{entrantID}`
- Added bean validation to the entrant entity
- `EntrantEdit` now performs edit on entrant.
- Added `localeResolver` to Application class of backend.
- Localised all bean validation messages.
- Localised all text in frontend that was not the database.
- Added button to toggle between English and Irish.
### 24-02 (Error handling)
- Added application-wide error handling class `ExceptionController`
### 25-02 (Started second search)
- Started second search form on frontend
- Created slider component for form input
- Added second search endpoint `/entrants/searchtwo/{hostCountry}/{venueCapacity}/{section}`
- Added endpoint to get all unique sections as part of search two `/sections`
### 26-02 (Second search progress)
- Completed functionality of second search endpoint
- Started trying to link frontend search two form with backend
- Put both searches into an Accordion

## Week 3 (27-02-23 - 03-03-23) :checkered_flag:
- Completed search two
- Removed default home page in react project
- Added error prevention to search features

