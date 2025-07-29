package com.yhm.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yhm.board.domain.Boards;
import com.yhm.board.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;


    @Override
    public List<Boards> list() {
        return boardMapper.list();
    }

    @Override
    public PageInfo<Boards> list(int page, int size) {
        // PageHelper.startPage ( 현재페이지, 페이지당 데이터 수 )
        PageHelper.startPage(page, size); // .xml에서 작성된 쿼리를 중간에 낚아채 수정해서 쿼리를 DB에 넘김 
        List<Boards> list = boardMapper.list();
        PageInfo<Boards> pageInfo = new PageInfo<>(list);

        // 정렬 createdAt 내림 차순 


        // 정렬 
        // 1. createdAt 오름차순
        // 2. updatedAt 오름 차순 
        pageInfo.getList().sort((t1, t2) -> { 
            int createdAtCompare = t1.getCreatedAt().compareTo(t2.getCreatedAt());
            if (createdAtCompare != 0) { 
                return createdAtCompare;
            }
            return t1.getUpdatedAt().compareTo(t2.getUpdatedAt());
        });
        return pageInfo;
    }

    @Override
    public Boards select(Long no) {
        return boardMapper.select(no);
    }

    @Override
    public Boards selectById(String id) {
        return boardMapper.selectById(id);
    }

    @Override
    public boolean insert(Boards entity) {
        return boardMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Boards entity) {
        return boardMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Boards entity) {
        return boardMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) {
        return boardMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) {
        return boardMapper.deleteById(id) > 0;
     }

    @Override
    public boolean completeAll() throws Exception {
        return boardMapper.completeAll() > 0;
    }

    @Override
    public boolean deleteAll() throws Exception {
        return boardMapper.deleteAll() > 0;
    }
    
}
