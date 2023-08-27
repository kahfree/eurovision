package sd4.controller;

import jakarta.validation.Valid;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import sd4.model.Entrant;
import sd4.model.Venue;
import sd4.service.EntrantService;
import sd4.service.VenueService;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EVController {

    @Autowired
    private EntrantService entrantService;
    @Autowired
    private VenueService venueService;

    public EVController() {
        System.out.println("Running EV Controller");
    }
    ////////////////ENTRANT METHODS/////////////////////////////////////////////////////
    @GetMapping("/entrants")
    public List<Entrant> getAllEntrants() { return entrantService.findAll();}

    @GetMapping("/entrants/{country}/{startDate}/{endDate}")
    public List<Entrant> searchEntrants(@PathVariable String country, @PathVariable String startDate, @PathVariable String endDate) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date start = dateFormat.parse(startDate);
            Date end = dateFormat.parse(endDate);
            return entrantService.searchEntrants(country,start,end);
    }

    @GetMapping("/entrants/searchtwo/{hostCountry}/{venueCapacity}/{section}")
    public List<Entrant> searchtwo(@PathVariable String hostCountry, @PathVariable int venueCapacity, @PathVariable String section){
        return entrantService.searchTwo("%" + hostCountry + "%",section,venueService.getVenuesLessThanCapacity(venueCapacity));
    }
    @GetMapping("/sections")
    public List<String> uniqueSections(){
        return entrantService.getUniqueSections();
    }
    @GetMapping("/entrants/{id}")
    public Entrant getEntrantByID(@PathVariable int id){
        return entrantService.getEntrantByID(id).orElse(null);
    }

    @GetMapping(
            value = "/entrants/image/{entrantID}",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getImage(@PathVariable int entrantID) throws IOException {
        Optional<Entrant> entrant = entrantService.getEntrantByID(entrantID);
        if(!entrant.isPresent()) {
            //Return error response here
            return IOUtils.toByteArray("Shits fucked");
        }
        InputStream in = getClass()
                .getResourceAsStream("/static/assets/images/" + entrant.get().getLogo());
        return IOUtils.toByteArray(in);
    }

    @PutMapping("/entrants/{id}")
    public ResponseEntity editEntrant(@PathVariable int id, @Valid @RequestBody Entrant entrant){
        entrantService.saveEntrant(id, entrant);
        return ResponseEntity.ok("Entrant was successfully updated");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String,String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName,errorMessage);
        });
        return errors;
    }
    ////////////////VENUE METHODS///////////////////////////////////////////////////////
    @GetMapping("/venues")
    public List<Venue> getAllVenues(){ return venueService.findAll();}

    @GetMapping("/test")
    public int test(){ return 1/0;}
    
    @GetMapping("/venues/{id}")
    public Venue getVenueByID(@PathVariable int id){
        return venueService.getVenueByID(id).orElse(null);
    }

    @GetMapping("/venues/capacity")
    public List<Venue> getVenuesCapacity(){
        return venueService.findAllCapacity();
    }
}
