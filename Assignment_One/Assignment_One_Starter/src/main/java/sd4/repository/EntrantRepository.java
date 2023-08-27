package sd4.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sd4.model.Entrant;

import java.util.Date;
import java.util.List;

@Repository
public interface EntrantRepository extends CrudRepository<Entrant, Integer> {
    public List<Entrant> findByArtistCountryContainingAndDateOfFinalBetweenOrderByTotalPointsDesc(String country, Date startDate, Date endRate);
    @Query("select e from Entrant e where e.hostCountry LIKE :hostCountry AND e.section = :section AND e.venueID IN :venueIds order by e.totalPoints desc")
    public List<Entrant> findByHostCountryContainingAndSectionOrderByTotalPointsDesc(String hostCountry, String section, List<Integer> venueIds);
    @Query("Select distinct e.section from Entrant e")
    public List<String>  findDistinctBySection();
}
