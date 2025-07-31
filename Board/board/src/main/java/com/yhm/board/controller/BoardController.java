package com.yhm.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.yhm.board.domain.Boards;
import com.yhm.board.domain.Files;
import com.yhm.board.domain.Pagination;
import com.yhm.board.service.BoardService;
import com.yhm.board.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/boards")
public class BoardController {
    
    @Autowired
    private BoardService boardService;

    @Autowired
    private FileService fileService;

    
    @GetMapping()
    public ResponseEntity<?> getAll(
        @RequestParam(value ="page", defaultValue = "1", required = false) int page,
        @RequestParam(value ="size", defaultValue = "10", required = false) int size
    ) throws Exception {
        try {
            PageInfo<Boards> pageInfo = boardService.list(page, size);
            Pagination pagination = new Pagination();
            pagination.setPage(page);
            pagination.setSize(size);
            pagination.setTotal(pageInfo.getTotal());
            Map<String, Object> response = new HashMap<>();
            List<Boards> list = pageInfo.getList();
            response.put("list", list);
            response.put("pagination", pagination);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id) {
        try {
            Boards board = boardService.selectById(id);
            Map<String, Object> response = new HashMap<>();
            // 게시글 
            response.put("board",board);

            // 파일 목록
            Files file = new Files();
            file.setPTable("boards");
            file.setPNo(board.getNo());
            List<Files> fileList = fileService.listByParent(file);
            response.put("board", board);
            response.put("fileList", fileList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * @RequestBody 붙일 때 VS 안 붙일 때 차이
     * - 붙이는 경우        : application/json, application/xml
     * - 안 붙이는 경우     : mutipart/form-data, application/x-www-form-urlencoded
     */
    @PostMapping(value ="", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createJSON(@RequestBody Boards board) {
        try {
            boolean result = boardService.insert(board);
            if ( result ) 
                return new ResponseEntity<>("SUCCESS",HttpStatus.CREATED);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value ="", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createdFormData(Boards board) {
        try {
            boolean result = boardService.insert(board);
            if ( result ) 
                return new ResponseEntity<>("SUCCESS",HttpStatus.CREATED);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateJSON(@RequestBody Boards board) {
        try {
            boolean result = boardService.updateById(board);
            if ( result ) 
                return new ResponseEntity<>("SUCCESS",HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateFormData(Boards board) {
        try {
            boolean result = boardService.updateById(board);
            if ( result ) 
                return new ResponseEntity<>("SUCCESS",HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id") String id) {
        try {
           boolean result = boardService.deleteById(id);
            if ( result ) 
                return new ResponseEntity<>("SUCCESS",HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // //  전체 삭제
    // @DeleteMapping("/all")
    // public ResponseEntity<?> deleteAll() {
    //     try {
    //        boolean result = boardService.deleteAll();
    //         if ( result ) 
    //             return new ResponseEntity<>("SUCCESS",HttpStatus.OK);
    //         else
    //             return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // // 전체 완료 
    // @PutMapping("/all")
    // public ResponseEntity<?> completeAll() { 
    //     try {
    //         boolean result = boardService.completeAll();
    //         if ( result ) 
    //             return new ResponseEntity<>("SUCCESS",HttpStatus.OK);
    //         else
    //             return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
