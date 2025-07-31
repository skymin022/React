package com.yhm.board.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yhm.board.domain.Boards;
import com.yhm.board.domain.Files;
import com.yhm.board.mapper.BoardMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;


    @Override
    public List<Boards> list()throws Exception {
        return boardMapper.list();
    }

    @Autowired
    private FileService fileService;


    @Override
    public PageInfo<Boards> list(int page, int size) throws Exception{
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
    public Boards select(Long no)throws Exception {
        return boardMapper.select(no);
    }

    @Override
    public Boards selectById(String id) throws Exception{
        return boardMapper.selectById(id);
    }

    @Override
    public boolean insert(Boards entity)throws Exception {
        // fileService ➡ 첨부 파일 업로드 연결
        // 게시글 등록
        int result = boardMapper.insert(entity);
        // 파일 업로드 
        result += upload(entity);
        return result > 0;
    }

    // 업로드 메소드
    public int upload (Boards board) { 
        int result =0;
        String pTable = "boards";
        Long pNo = board.getNo();

        List<Files> uploadFileList = new ArrayList<>();

        MultipartFile mainFile = board.getMainFile();
        if ( mainFile != null && !mainFile.isEmpty() ) { 
            Files mainFileInfo = new Files();
            mainFileInfo.setPTable(pTable);
            mainFileInfo.setPNo(pNo);
            mainFileInfo.setData(mainFile);
            mainFileInfo.setType("MAIN");
            uploadFileList.add(mainFileInfo);
        }
        
        List<MultipartFile> files = board.getFiles();
        if( files != null && files.isEmpty()) { 
            for (MultipartFile multipartFile : files) {
                if( multipartFile.isEmpty() ) { 
                    continue;
                }
                Files fileInfo = new Files();
                fileInfo.setPTable(pTable);
                fileInfo.setPNo(pNo);
                fileInfo.setData(multipartFile);
                fileInfo.setType("SUB");
                uploadFileList.add(fileInfo);
            }
        }
        try {
            result += fileService.upload(uploadFileList);
        } catch (Exception e) {
            log.error("게시글 파일 업로드 중 에러 발생 ");
            e.printStackTrace();
        }
        return result;
    }




    @Override
    public boolean update(Boards entity) throws Exception{
        // 게시글 수정 
        int result = boardMapper.update(entity);
        // 파일 업로드 
        result += upload(entity);
        return result > 0;
    }

    @Override
    public boolean updateById(Boards entity)throws Exception {
        // 게시글 수정 
        int result = boardMapper.updateById(entity);
        // 파일 업로드 
        Boards oldBoard = boardMapper.selectById(entity.getId());
        entity.setNo( oldBoard.getNo() );
        result += upload(entity);
        return result > 0;
    }

    @Override
    public boolean delete(Long no)throws Exception {
        // 게시글 삭제
        int result = boardMapper.delete(no);
        // 종속된 첨부파일 삭제
        Files file = new Files();
        file.setPTable("boards");
        file.setPNo(no);
        int deleteCount = fileService.deleteByParent(file);
        log.info(deleteCount + " 개의 파일이 삭제 되었습니다.");
        return result > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception {
        // 게시글 삭제 
        int result = boardMapper.deleteById(id);
        // 종속된 첨부파일 삭제
        Boards board = boardMapper.selectById(id);
        Long no = board.getNo();
        Files file = new Files();
        file.setPTable("boards");
        file.setPNo(no);
        int deleteCount = fileService.deleteByParent(file);
        log.info(deleteCount + " 개의 파일이 삭제 되었습니다.");
        return result > 0;
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
