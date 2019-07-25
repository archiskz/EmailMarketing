package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.WorkflowTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface WorkflowTaskRepository extends JpaRepository<WorkflowTask,Integer> {


//        WorkflowTask findByName(String name);// Trong đây làm gì có name mà m findByName...??
// rồi đó thằng ông nội mốt thêm thư viện gì dừung thêm file jar nữa nha cần gì ibx t
        @Query("SELECT wl FROM WorkflowTask wl WHERE wl.workflow.id =: workflowId")
        List<WorkflowTask> findAllWorkflowByStatus(@Param("workflowId")int workflowId);
        WorkflowTask findWorkflowById(Integer id);

}
