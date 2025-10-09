package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner, Long> {
}