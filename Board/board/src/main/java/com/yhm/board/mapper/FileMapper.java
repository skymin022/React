package com.yhm.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.yhm.board.domain.Files;

@Mapper
public interface FileMapper extends BaseMapper<Files> {

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
