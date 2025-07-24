package com.it.sps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.it.sps.entity.Application;
import com.it.sps.entity.ApplicationPK;

public interface ApplicationRepository extends JpaRepository<Application,ApplicationPK>{
	
		 @Query(" SELECT a FROM Application a WHERE a.applicationNo=:applicationNo ")
		 Application findAllWithApplicant(@Param("applicationNo")String applicationNo);
	 
		 
		  

}
