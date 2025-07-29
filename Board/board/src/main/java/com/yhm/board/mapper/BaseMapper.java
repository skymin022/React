package com.yhm.board.mapper;

import java.util.List;

public interface BaseMapper<E> {
    public List<E> list();
    // public PageInfo<E> page(int page, int size);
    public E select(Long no);
    public E selectById(String id);
    public int insert(E entity);    
    public int update(E entity);    
    public int updateById(E entity);    
    public int delete(Long no);    
    public int deleteById(String id);
}
