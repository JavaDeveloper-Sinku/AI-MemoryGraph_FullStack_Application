package com.memorygraph.memory_engine.service;


import com.memorygraph.memory_engine.dto.request.CreateWorkspaceRequest;
import com.memorygraph.memory_engine.entity.Workspace;
import com.memorygraph.memory_engine.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    public Workspace createWorkspace( CreateWorkspaceRequest request) {

        Workspace workspace =
                Workspace.builder()
                        .name(request.getName())
                        .createdAt(LocalDateTime.now())
                        .build();

        return workspaceRepository.save(workspace);
    }


    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }


    public void deleteWorkspace(Long id) {
        workspaceRepository.deleteById(id);
    }


}
