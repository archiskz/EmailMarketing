package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign,Integer> {
        Campaign findByName(String name);
//        Campaign findById(int id);
        Campaign findCampaignById(int id);
        List<Campaign> findAllByAutomationIsFalse();

<<<<<<< HEAD
        Campaign findTopByOrderByCreatedTimeDesc();

        List<Campaign> findTop5ByOrderByCreatedTimeDesc();

=======
//        Campaign findTop1ByOrderByCreatedTimeDesc();
        Campaign findTopByOrderByCreatedTimeDesc();
>>>>>>> 85360d2359fc3c73a0810a29174ac89f54e90407





}
