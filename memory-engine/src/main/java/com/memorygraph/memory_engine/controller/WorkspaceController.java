package com.memorygraph.memory_engine.controller;


import com.memorygraph.memory_engine.dto.request.CreateWorkspaceRequest;
import com.memorygraph.memory_engine.entity.Workspace;
import com.memorygraph.memory_engine.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WorkspaceController {

    private final WorkspaceService workspaceService;


    @PostMapping
    public Workspace createWorkspace(@RequestBody CreateWorkspaceRequest request) {
        return workspaceService.createWorkspace(request);
    }

    @GetMapping
    public List<Workspace> getAllWorkspaces() {
        return workspaceService.getAllWorkspaces();

    }

    @DeleteMapping("/{id}")
    public void deleteWorkspace(@PathVariable long id) {
        workspaceService.deleteWorkspace(id);
    }
}
