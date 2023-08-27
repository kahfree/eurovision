package sd4.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sd4.model.Venue;

import java.util.List;

@Repository
public interface VenueRepository extends CrudRepository<Venue, Integer> {
    @Query("select v from Venue v order by v.capacity desc")
    public List<Venue> getAllOrderedByCapacity();
    @Query("select v.venueID from Venue v where v.capacity < :capacity")
    public List<Integer> findByCapacityLessThan(int capacity);
}
