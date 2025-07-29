package com.yhm.board.service;

import com.yhm.board.domain.Boards;

public interface BoardService extends BaseService<Boards> {
        // 전체 완료
    public boolean completeAll() throws Exception;
    // 전체 삭제
    public boolean deleteAll() throws Exception;
}
