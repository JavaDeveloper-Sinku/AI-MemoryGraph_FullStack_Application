package com.memorygraph.memory_engine.repository;

import com.memorygraph.memory_engine.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace,Long> {

}
