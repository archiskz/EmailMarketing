package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import com.emailmkt.emailmarketing.model.CampaignSubcriber;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class HibernateSearchService {
    @Autowired
    private final EntityManager centityManager;


    @Autowired
    public HibernateSearchService(EntityManager entityManager) {
        super();
        this.centityManager = entityManager;
    }

    @Transactional
    public List<AppointmentSubcriber> searchMessageAppointment(String searchTerm){

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(centityManager);
        QueryBuilder appointmentQueryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(AppointmentSubcriber.class)
                .get();

        org.apache.lucene.search.Query AppointmentQuery = appointmentQueryBuilder
                .keyword()
                .onField("messageId")
                .matching(searchTerm)
                .createQuery();

        org.hibernate.search.jpa.FullTextQuery jpaQuery
                = fullTextEntityManager.createFullTextQuery(AppointmentQuery, AppointmentSubcriber.class);
        List<AppointmentSubcriber> result = jpaQuery.getResultList();

        return result;
    }

    @Transactional
    public List<CampaignSubcriber> searchMessageCampaign(String searchTerm){
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(centityManager);
        QueryBuilder campaignQueryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(CampaignSubcriber.class)
                .get();

        org.apache.lucene.search.Query CampaignQuery = campaignQueryBuilder
                .keyword()
                .onField("messageId")
                .matching(searchTerm)
                .createQuery();

        org.hibernate.search.jpa.FullTextQuery jpaQuery
                = fullTextEntityManager.createFullTextQuery(CampaignQuery, AppointmentSubcriber.class);
        List<CampaignSubcriber> result = jpaQuery.getResultList();
        return result;
    }

}
