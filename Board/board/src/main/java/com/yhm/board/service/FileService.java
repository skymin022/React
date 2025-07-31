package com.yhm.board.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yhm.board.domain.Files;

import jakarta.servlet.http.HttpServletResponse;

public interface FileService extends BaseService<Files> {

    //  파일 업로드 
    public boolean upload(Files file) throws Exception;
    // 파일 다중 업로드 
    public int upload(List<Files> fileList) throws Exception;

    // 파일 다운로드 
    public boolean download(String id, HttpServletResponse response) throws Exception;

    // 부모기준 목록
    public List<Files> listByParent(Files file) throws Exception;
    // 부모기준 목록
    public int deleteByParent(Files file) throws Exception;
    
    // 선택 삭제(String) - no
    public int deleteFiles(String noList) throws Exception ;
    // 선택 삭제(String) - id
    public int deleteFilesById(String idList) throws Exception ;
    
    // 선택 삭제(List) - no
    public int deleteFileList(@Param("noList") List<Long> noList) throws Exception ;
    // 선택 삭제(List) - id
    public int deleteFileListById(@Param("idList") List<String> idList) throws Exception ;
    
    // 타입별 파일 조회
    public Files selectByType(Files file) throws Exception ;
    // 타입별 파일 목록
    public List<Files> listByType(Files file) throws Exception ;
}

