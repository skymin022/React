package com.yhm.board.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.yhm.board.domain.Boards;

@Mapper
public interface BoardMapper extends BaseMapper<Boards>{

    // 전체 완료
    public int completeAll() throws Exception;
    // 전체 삭제
    public int deleteAll() throws Exception;
    
} 