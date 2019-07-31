package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Task;
import com.emailmkt.emailmarketing.model.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface TaskRepository extends JpaRepository<Task,Integer> {


//        WorkflowTask findByName(String name);// Trong đây làm gì có name mà m findByName...??

        @Query("SELECT tasks FROM Task tasks WHERE tasks.workflow.id =: workflowId")
        List<Task> findAllWorkflowByStatus(@Param("workflowId")int workflowId);

        Task findWorkflowById(Integer id);

        Task findTaskByPreTaskAndWorkflow_Id(String pre, int workflow);
        Task findTaskByPostTaskAndWorkflow_Id(String post, int workflow);

        Task findTaskByShapeIdAndWorkflow_Id(String shape_id, int workflow);
//        List<WorkflowTask> findAllByTaskId(int id);

        List<Task>findTaskByPreTask(String pretask);

}
