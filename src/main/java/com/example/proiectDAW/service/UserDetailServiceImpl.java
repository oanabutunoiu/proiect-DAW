package com.example.proiectDAW.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.proiectDAW.domain.UserAccount;
import com.example.proiectDAW.domain.UserAccountRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

	@Autowired
	private UserAccountRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserAccount currentUser = repository.findByUsername(username);
		UserDetails user = new org.springframework.security.core.userdetails.User(username, currentUser.getPassword(),
				true, true, true, true, AuthorityUtils.createAuthorityList(currentUser.getRole()));
		return user;
	}

}
