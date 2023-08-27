package sd4.service;

import org.hibernate.metamodel.mapping.EntityRowIdMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd4.model.Entrant;
import sd4.repository.EntrantRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EntrantService {
    @Autowired
    private EntrantRepository entrantRepo;

    public List<Entrant> findAll() { return (List<Entrant>) entrantRepo.findAll(); }
    public List<Entrant> searchEntrants(String country, Date startDate, Date endDate){ return entrantRepo.findByArtistCountryContainingAndDateOfFinalBetweenOrderByTotalPointsDesc(country, startDate, endDate);}
    public Optional<Entrant> getEntrantByID(int id){ return entrantRepo.findById(id);}
    public Entrant saveEntrant(int id, Entrant entrant){return entrantRepo.save(entrant);}
    public List<Entrant> searchTwo(String hostCountry, String section, List<Integer> venueIds) { return entrantRepo.findByHostCountryContainingAndSectionOrderByTotalPointsDesc(hostCountry,section, venueIds);}
    public List<String> getUniqueSections(){return entrantRepo.findDistinctBySection();}
}
