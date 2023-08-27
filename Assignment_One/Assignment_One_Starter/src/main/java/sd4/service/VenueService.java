package sd4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd4.model.Venue;
import sd4.repository.VenueRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepo;

    public List<Venue> findAll() { return (List<Venue>) venueRepo.findAll();}
    public Optional<Venue> getVenueByID(int id) { return venueRepo.findById(id);}
    public List<Venue> findAllCapacity() { return venueRepo.getAllOrderedByCapacity();}
    public List<Integer> getVenuesLessThanCapacity(int capacity) { return venueRepo.findByCapacityLessThan(capacity);}
}
