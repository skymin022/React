package com.aloha.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.todo.domain.Todos;
import com.aloha.todo.mapper.TodoMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoMapper todoMapper;

    @Override
    public List<Todos> list() {
        return todoMapper.list();
    }

    @Override
    public PageInfo<Todos> list(int page, int size) {
        // PageHelper.startPage ( 현재페이지, 페이지당 데이터 수 )
        PageHelper.startPage(page, size); // .xml에서 작성된 쿼리를 중간에 낚아채 수정해서 쿼리를 DB에 넘김 
        List<Todos> list = todoMapper.list();
        PageInfo<Todos> pageInfo = new PageInfo<>(list);
        // 정렬 
        // 1. status 오름차순
        // 2. seq 오름 차순 
        pageInfo.getList().sort((t1, t2) -> { 
            int statusCompare = t1.getStatus().compareTo(t2.getStatus());
            if (statusCompare != 0) { 
                return statusCompare;
            }
            return t1.getSeq().compareTo(t2.getSeq());
        });
        return pageInfo;
    }

    @Override
    public Todos select(Long no) {
        return todoMapper.select(no);
    }

    @Override
    public Todos selectById(String id) {
        return todoMapper.selectById(id);
    }

    @Override
    public boolean insert(Todos entity) {
        return todoMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Todos entity) {
        return todoMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Todos entity) {
        return todoMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) {
        return todoMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) {
        return todoMapper.deleteById(id) > 0;
    }

    @Override
    public boolean completeAll() throws Exception {
        return todoMapper.completeAll() > 0;
    }

    @Override
    public boolean deleteAll() throws Exception {
        return todoMapper.deleteAll() > 0;
    }


    
}
