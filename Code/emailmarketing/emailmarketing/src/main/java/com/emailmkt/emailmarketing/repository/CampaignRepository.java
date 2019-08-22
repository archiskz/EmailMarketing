package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign,Integer> {
        Campaign findByNameAndAccount_id(String name, int account_id);
//        Campaign findById(int id);
        Campaign findCampaignById(int id);
        List<Campaign> findAllByAutomationIsFalseOrderByCreatedTimeDesc();

        List<Campaign> findCampaignByAccount_idAndAutomationIsFalseOrderByCreatedTimeDesc(int account_id);

        Campaign findTopByAccount_idAndAutomationIsFalseAndStatusContainsOrderByCreatedTimeDesc(int accountId,String status);

        List<Campaign> findTop5ByOrderByCreatedTimeDesc();


//        Campaign findTop1ByOrderByCreatedTimeDesc();

        List<Campaign> findAllByOrderByCreatedTimeDesc();




}
